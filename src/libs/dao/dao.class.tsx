import React from 'react'; 
import { 
  ApolloClient, 
  NormalizedCacheObject, 
} from "@apollo/client"; 


// --------------------------------------------------------
import { Cacher } from './cacher.class'; 
import { Fetcher } from './fetcher.class'; 


// Complete each methods to map it to the Apollo clients functions etc. 
export class Dao { 
  cacher:Cacher; 
  fetcher:Fetcher; 
  status:any; 

  constructor(client:ApolloClient<NormalizedCacheObject>) { 
    this.cacher = new Cacher(client); 
    this.fetcher = new Fetcher(client); 
  }


}
