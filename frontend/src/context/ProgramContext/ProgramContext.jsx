import React, { createContext, useState, useEffect, useReducer, useContext } from 'react'
export const ProgramContext = createContext()

import { AppContext } from "src/context/AppContext"

import {
    programStateReducer,
} from './reducers/programStateReducer'

import axios from 'axios'

export const ProgramProvider = ({ children, id }) => {

    const appContext = useContext(AppContext);
    //State de show modal scheduleClass

    const initialState = {
        loading: true,
        program: {
            actived: false,
            title: '',
            subtitle: '',
            description: '',
            benefits: [],
            events: [],
            program_price: null,
            picture: '',
            video_presentation: ''
        }

    }

    const [programState, dispatch] = useReducer(programStateReducer, initialState)

    useEffect(() => {
        async function fetchData() {
            await axios
                .get(`/api/programs/${id}/`)
                .then(res => {
                    dispatch({ type: 'FETCH_SUCCESS', payload: res.data })
                })
                .catch(err => {
                    console.log(err.response)
                });
        }
        fetchData();
    }, []);

    return (
        <ProgramContext.Provider value={{
            programState,
        }}>
            {children}
        </ProgramContext.Provider>
    )
}
