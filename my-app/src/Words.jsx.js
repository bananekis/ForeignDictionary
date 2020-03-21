import React from "react";
import {TranslationService} from "./translationService";
import {SpeechService} from "./speechService";


const translateService = new TranslationService();
const speechService = new SpeechService();

export const Words = (props) => {
  const {
    language,
    words,
    onChange,
  } = props;

  console.log(process.env['GOOGLE_APPLICATION_CREDENTIALS']);

  if (!words || !language) {
    return null;
  }

  const onAdd = () => {
    const newWord = {value: '', translatedValue: ''};

    onChange(words.push(newWord))
  };

  const changeWord = (event, index) => {
    const changedWord = event.currentTarget.value;

    onChange(words.update(index, originalWord => ({
      ...originalWord,
      value: changedWord,
    })));
  };

  const changeTranslatedWord = (event, index) => {
    const changedWord = event.currentTarget.value;

    onChange(words.update(index, originalWord => ({
      ...originalWord,
      translatedValue: changedWord,
    })));
  };

  const deleteWord = (index) => {
    onChange(words.delete(index));
  };

  const translateText = async (index) => {
    const word = words.get(index);
    const translatedValue = await translateService.translate(word.value, language.code);

    onChange(words.update(index, originalWord => ({
      ...originalWord,
      translatedValue,
    })));
  };

  const pronounceText = async (index) => {
    const word = words.get(index);
    await speechService.speech(word.translatedValue, language.code);
  };

  return (
    <>
      <div className="row">
        <div className="col-1-of-2">
          <button onClick={onAdd} className={"btn btn--add"}>Add a new word</button>
        </div>
        <div className="col-1-of-2">
          &nbsp;
        </div>
      </div>

      <div className={"row"}>
        <div className="col-1-of-2">
          {words.toArray().map((word, index) => (
            <div key={index} className={"form-group form-group--delete u-margin-bottom"}>
              <span><button onClick={() => deleteWord(index)}>X</button></span>
              <input value={word.value} placeholder={"Your word"} onChange={(event) => changeWord(event, index)}
                     className="form-field form-field--special"/>
            </div>
          ))}
        </div>

        <div className="col-1-of-2">
          {words.toArray().map((word, index) => (
            <div key={index} className={"form-group form-group--voice form-group--translate u-margin-bottom"}>
              <span className={"one"}><button onClick={async () => await translateText(index)}>--></button></span>
              <input value={word.translatedValue} placeholder={"Translated word"} onChange={(event) => changeTranslatedWord(event, index)}
                     className="form-field form-field--special"/>
              <span className={"two"}><button onClick={async () => await pronounceText(index)}>voice</button></span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};