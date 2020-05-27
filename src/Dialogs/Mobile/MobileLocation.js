//@flow
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { styles } from './HdyfMobileDialogCommonStyles';
import { useSelector } from 'react-redux';
import BlueButton, {BackButton, NextButton} from '../../Components/BlueButton';
import AppBar from '@material-ui/core/AppBar';
import { action } from '../../sagas';
import { FlagDropDown } from '../../Components/FlagDropDown';
import { TextField } from '../../Components/TextField';
import { InputLabel } from '@material-ui/core';
import { genderChoices, raceChoices } from '../../translations';
import Image from '../../assets/images/Medical_Illustration.png';
import clsx from 'clsx';

const useStyles = makeStyles(styles);

export function MobileLocation(props: { onNext: Function, onPrevious: Function }) {
  const classes = useStyles();
  const answers = useSelector((state) => state.answers);
  const { onNext, onPrevious } = props;
  const {
    dialog_location_title,
    button_next,
    button_back,
    zipcode_input_placeholder,
    alert_missing_zipcode,
    country_selector_search_placeholder,
    dialog_basic_info_title,
    age_input_label,
    age_input_placeholder,
    gender_input_placeholder,
    race_input_placeholder,
  } = useSelector((state) => state.elements);
  const language = useSelector((state) => state.language);
  const onButtonClick = () => {
    if (answers['zipcode'].value === '') {
      alert(alert_missing_zipcode[language]);
    } else {
      onNext();
    }
  };
  return (
    <div className={clsx(classes.content, classes.backgroundWhite)}>
      <div className={classes.imageContainer}>
        <img src={Image} alt="Illustration" />
      </div>
      <h2 className={clsx(classes.title, classes.titleSmall)}>{dialog_location_title[language]}</h2>
      <div className={classes.formField}>
        <TextField
          label={zipcode_input_placeholder[language]}
          placeholder={zipcode_input_placeholder[language]}
          size={'medium'}
          onChange={(event) =>
            action('ANSWER_SET', { questionId: 'zipcode', data: { value: event.target.value } })
          }
          value={answers['zipcode'].value}
        />
      </div>
      <div className={classes.formField}>
        <InputLabel className={classes.label}>
          {country_selector_search_placeholder[language]}
        </InputLabel>
        <FlagDropDown
          onSelect={(value) =>
            action('ANSWER_SET', { questionId: 'country', data: { value: value } })
          }
        />
      </div>
      <h2 className={clsx(classes.title, classes.titleSmall)}>
        {dialog_basic_info_title[language]}
      </h2>
      <div className={classes.formField}>
        <TextField
          label={age_input_label[language]}
          placeholder={age_input_placeholder[language]}
          size={'medium'}
          onChange={(event) =>
            action('ANSWER_SET', { questionId: 'age', data: { value: event.target.value } })
          }
          value={answers['age'].value}
        />
      </div>
      <div className={classes.formField}>
        <InputLabel className={classes.label}>{gender_input_placeholder[language]}</InputLabel>
        <TextField
          size={'medium'}
          select
          onChange={(event) =>
            action('ANSWER_SET', { questionId: 'gender', data: { value: event.target.value } })
          }
          value={answers['gender'].value}
        >
          {genderChoices[language].map((item, index) => (
            <option key={index} value={item}>
              {item}
            </option>
          ))}
        </TextField>
      </div>
      <div className={classes.formField}>
        <InputLabel className={classes.label}>{race_input_placeholder[language]}</InputLabel>
        <TextField
          size={'medium'}
          select
          onChange={(event) =>
            action('ANSWER_SET', { questionId: 'race', data: { value: event.target.value } })
          }
          value={answers['race'].value}
        >
          {raceChoices[language].map((item, index) => (
            <option key={index} value={item}>
              {item}
            </option>
          ))}
        </TextField>
      </div>
      <AppBar className={classes.commandBar} position="fixed" variant="elevation">
        <BackButton
          variant="noShadow"
          className={classes.commandButton}
          onClick={() => onPrevious()}
          size="regular"
        >
          {button_back[language]}
        </BackButton>
        <NextButton
          variant="default"
          className={classes.commandButton}
          onClick={() => onButtonClick()}
          size="large"
        >
          {button_next[language]}
        </NextButton>
      </AppBar>
    </div>
  );
}
