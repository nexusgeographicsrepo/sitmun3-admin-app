export const environment = {
  production: false,
  agGridTheme: "ag-theme-balham",
  scopeTypes : ['selectType','Municipal', 'Supramunicipal', 'Total'],
  apiBaseURL: `https://sitmun-backend-core.herokuapp.com`,
  tasksTypes : [ {id: 1, name:'basic'}, {id:2, name:'download'}, {id:3, name:'document'}, {id: 4, name:'locator'}, {id:5, name:'query'}, {id:6,name:'moreInfo'},
  {id:7, name:'report'}, {id:8, name: 'editionWFS'}, {id:9, name:'thematic'}, {id:10, name:'extraction'}, {id:11,name: 'NUMEdition'}, {id: 12, name:'RELEdition'},
  {id:13, name:'VISEdition'}, {id:14, name:'HIDDENEdition'} ]
};
