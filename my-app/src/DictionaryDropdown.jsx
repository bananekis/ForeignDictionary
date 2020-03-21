import React from 'react';

export const DictionaryDropdown = (props) => {
    const {
        value,
        dictionaries,
        onChange,
    } = props;

    const handleEvent = (event) => {
        const dictionaryName = event.currentTarget.value;
        const dictionary = dictionaries.find(x => x.name === dictionaryName);

        onChange(dictionary);
    };

    return (
      <>
        <div className="u-center-text u-margin-top-medium">
            <h2 className="heading-secondary">
                Select your created dictionary
            </h2>
        </div>
        <div className="u-center-text">
          <select onChange={handleEvent} value={value?.name}>
            {dictionaries.map((dictionary, index) => {
              return (
                <option key={index} value={dictionary.name} label={dictionary.name} />
              )
            })}
          </select>
        </div>
      </>
    );
};