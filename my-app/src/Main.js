import React, {useEffect, useState} from 'react';
import {DictionaryDropdown} from "./DictionaryDropdown";
import {DictionaryForm} from "./DictionaryForm";
import {List, Map} from "immutable/dist/immutable";
import {Words} from "./Words.jsx";
import {useDispatch, useSelector} from "react-redux";
import {Actions} from "./reducers/rootReducer";

export const Main = (props) => {
    const {
        onLogout,
    } = props;

    const [currentDictionary, setCurrentDictionary] = useState();

    const dispatch = useDispatch();
    const dictionaries = useSelector(state => state.dictionaries);

    const [wordsByDictionaries, setWordsByDictionaries] = useState(Map());

    useEffect(() => {
        const rawDictionaries = window.localStorage.getItem('dictionaries');
        const loadedDictionaries = rawDictionaries ? JSON.parse(rawDictionaries) : [];

        dispatch({ type: Actions.DictionariesInitialized, payload: { dictionaries: loadedDictionaries }});

        const selectedDictionaryName = window.localStorage.getItem('selectedDictionary');
        const selectedDictionary = loadedDictionaries.find(x => x.name === selectedDictionaryName);

        setCurrentDictionary(selectedDictionary);

        let mapOfDictionaries = Map();

        loadedDictionaries.forEach(dictionary => {
            const words = List(JSON.parse(window.localStorage.getItem('dictionary_' + dictionary.name)));
            mapOfDictionaries = mapOfDictionaries.set(dictionary.name, words);
        });

        setWordsByDictionaries(mapOfDictionaries);
    }, []);

    useEffect(() => {
        if (!currentDictionary) {
            return;
        }

        window.localStorage.setItem('selectedDictionary', currentDictionary.name);
    }, [currentDictionary]);

    useEffect(() => {
        if (!currentDictionary && dictionaries.length > 0) {
            setCurrentDictionary(dictionaries[0]);
        }

        window.localStorage.setItem('dictionaries', JSON.stringify(dictionaries));
    }, [dictionaries]);

    useEffect(() => {
        if (!currentDictionary) {
            return;
        }

        const rawWords = JSON.stringify(wordsByDictionaries.get(currentDictionary.name).toArray());
        window.localStorage.setItem('dictionary_' + currentDictionary.name, rawWords);
    }, [wordsByDictionaries]);

    const words = currentDictionary && (
        wordsByDictionaries.get(currentDictionary.name) ?? List()
    );

    const onWordsChange = (updatedWords) => {
        setWordsByDictionaries(prevWordsByDictionaries => {
            return prevWordsByDictionaries.set(currentDictionary.name, updatedWords);
        });
    };

    const addDictionary = (dictionary) => {
      if (dictionaries.find(x => x.name === dictionary.name)) {
        return;
      }

        dispatch({
          type: Actions.DictionaryAdded,
          payload: { dictionary },
        });
    };

    return (
        <>
            <button onClick={onLogout} className={"btn btn--signOut"}>Sign out</button>

            <div className="u-center-text u-margin-bottom-large">
                <h2 className="heading-primary">
                    Foreign Dictionary
                </h2>
            </div>

            <DictionaryForm
                onAdd={addDictionary}
            />

            <DictionaryDropdown
                value={currentDictionary}
                dictionaries={dictionaries}
                onChange={setCurrentDictionary}
            />

            <Words
                language={currentDictionary?.language}
                words={words}
                onChange={onWordsChange}
            />
        </>
    );
};