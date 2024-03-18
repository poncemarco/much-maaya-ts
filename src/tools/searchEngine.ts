import DOMPurify from 'dompurify';
  import Fuse from 'fuse.js';

  //variables 
  let SEARCH_DATA: string[];
  let FUSE_INSTANCE: Fuse<string>; 
  let FUSE_OPTIONS = {
      includeScore: true,
      shouldSort: true, 
      keys: [ 
          {
              name: 'title',
              weight: 0.7,
          },
          {
              name: 'slug',
              weight: 0.5,
          },
          {
              name: 'unit',
              weight: 0.3,
          }],
      threshold: 0.5,
  };
  const SPINNER = `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-loader-2" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" strokeLinecap="round" stroke-linejoin="round" id="spinner">
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M12 3a9 9 0 1 0 9 9" />
                      <style>
                          #spinner {
                              animation: spin 1s linear infinite;
                          }
                          @keyframes spin {
                              0% {
                                  transform: rotate(0deg);
                              }
                              100% {
                                  transform: rotate(360deg);
                              }
                          }
                  </svg>`;

   //selectors
  const search = document.querySelector('#search') as HTMLInputElement;
  const searchReadout = document.querySelector('#searchReadout') as HTMLInputElement;
  const resultsList = document.querySelector('#searchResults') as HTMLElement; 
  //functions

  function updateSearchPageURL(search: string) {
      const url = new URL(window.location.href);
      url.searchParams.set('q', search);
      window.history.replaceState(null, "", url);
  }

  function generateSearchList(results:any[]) {
       return results.map((r) => {
          const { title, unit, id } = r.item;
          return `<li>
                      <a href="/catalogo/${id}" title=${title}>
                          <h3>${title}</h3>
                          <p>${unit}</p>
                      </a>
                  </li> `
       })
       .join('');
  }

  async function fetchSearchResults(search : string) {
  if (search.length === 0) {
    resultsList.innerHTML = "";
    return;
  }
  resultsList.innerHTML = SPINNER;
  if (!SEARCH_DATA) {
    try {
      const res = await fetch("/search.json");
      if (!res.ok) {
        throw new Error("Something went wrong…please try again");
      }
      const data = await res.json();
      SEARCH_DATA = data;
    } catch (e) {
      console.error(e);
    }
  }
  if (SEARCH_DATA && !FUSE_INSTANCE) {
    FUSE_INSTANCE = new Fuse(SEARCH_DATA, FUSE_OPTIONS);
  }
  if (!FUSE_INSTANCE) return;
  const searchResult = FUSE_INSTANCE.search(search);
  resultsList.innerHTML =
    searchResult.length > 0
      ? generateSearchList(searchResult)
      : "No results found…";
}

  function updateDocumentTitle(search: HTMLInputElement) {
      document.title = search ? `Search result for ${search}` : 'Search';
  } 

  function updateSearchReadout(search : URLSearchParams) {
      searchReadout.textContent = search
      ? `Search results for ${search}`
      : 'Search the Blog';

  }

  //listeners

  window.addEventListener("DOMContentLoaded", () => {
      const urlParams = DOMPurify.sanitize (
          new URLSearchParams(window.location.search).get('q')
          );
      updateDocumentTitle(urlParams);
      updateSearchReadout(urlParams);
      search.value = urlParams ?? '';
  });

  search.addEventListener("input", () => {
      const searchTerm = DOMPurify.sanitize(search.value);
      updateDocumentTitle(searchTerm);
      updateSearchReadout(searchTerm);
      fetchSearchResults(searchTerm);
      updateSearchPageURL(searchTerm);
  });