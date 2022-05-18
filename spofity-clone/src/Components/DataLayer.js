import React , {createContext, useContext, useReducer} from "react";

const DataLayerContext = createContext();

const DataLayer = ({initialState,reducer, children}) =>(
    <DataLayerContext.Provider value={useReducer(reducer,initialState)}>
        {children}
    </DataLayerContext.Provider>
);

const useDataLayerValue = ()=> useContext(DataLayerContext);

export {DataLayerContext,DataLayer, useDataLayerValue}