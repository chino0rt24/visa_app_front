import { useState } from 'react';

const useForm = (initState = Object) => {
  const [state, setState] = useState(initState);

  const onChange = (value, field, resetInitState) => {
    if (typeof resetInitState === 'object') {
      setState(resetInitState);
    } else {
      setState({
        ...state,
        [field]: value,
      });
    }
  };

  return {
    ...state,
    form: state,
    onChange,
  };
};

export default useForm;