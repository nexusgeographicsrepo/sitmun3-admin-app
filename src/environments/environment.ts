// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  agGridTheme: "ag-theme-balham",
  scopeTypes : ['selectType','Municipal', 'Supramunicipal', 'Total'],
  apiBaseURL: `http://localhost:8080`,
  tasksTypes : [ {id: 1, name:'basic'}, {id:2, name:'download'}, {id:3, name:'document'}, {id: 4, name:'locator'}, {id:5, name:'query'}, {id:6,name:'moreInfo'},
  {id:7, name:'report'}, {id:8, name: 'editionWFS'}, {id:9, name:'thematic'}, {id:10, name:'extraction'}, {id:11,name: 'NUMEdition'}, {id: 12, name:'RELEdition'},
  {id:13, name:'VISEdition'}, {id:14, name:'HIDDENEdition'} ]
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
