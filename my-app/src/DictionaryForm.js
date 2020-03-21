import React, {useState} from 'react';

const languages = [
  {
    name: "English",
    code: 'en'
  },
  {
    name: "Spanish",
    code: 'es'
  },
  {
    name: "Slovak",
    code: 'sk'
  },
  {
    name: "Czech",
    code: 'cs'
  },
  {
    name: "Chinese",
    code: 'zh-TW'
  },
  {
    name: "French",
    code: 'fr'
  },
  {
    name: "German",
    code: 'ge'
  },
  {
    name: "Hungarian",
    code: 'hu'
  },
  {
    name: "Italian",
    code: 'it'
  },
  {
    name: "Polish",
    code: 'pl'
  },
  {
    name: "Russian",
    code: 'ru'
  },
  {
    name: "Swedish",
    code: 'sv'
  },
];

export const DictionaryForm = (props) => {
  const {
    onAdd,
  } = props;

  const [name, setName] = useState('');
  const [language, setLanguage] = useState(languages[0]);

  const handleName = (event) => {
    const value = event.currentTarget.value;

    setName(value);
  };

  const addDictionary = () => {
    const dictionary = {
      name: name,
      language: language,
    };

    setName('');
    setLanguage(languages[0]);
    onAdd(dictionary);
  };

  const changeLanguage = (event) => {
    const languageCode = event.currentTarget.value;

    const changedLanguage = languages.find(lang => lang.code === languageCode);
    setLanguage(changedLanguage);
  };

  const disabled = name === '' || language === '';

  return (
    <div className="u-margin-top-medium">
      <div className="row">

        <div className="col-1-of-2 form-group form-group--normal">
                    <span>
                        Name of Dictionary
                    </span>
          <input
            type="text"
            value={name}
            name="dictionaryName"
            className="form-field form-field--normal"
            onChange={handleName}
          />
        </div>

        <div className="col-1-of-2 form-group form-group--normal custom-select">
          <span>
            Language
          </span>
          <select value={language?.code} onChange={changeLanguage}>
            {languages.map(lang => (
              <option key={lang.code} value={lang.code} label={lang.name} />
            ))}
          </select>
          <button
            disabled={disabled}
            onClick={addDictionary}
            className={"btn btn--plus"}
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
};