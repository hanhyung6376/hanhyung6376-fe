import React, { useState, useCallback } from 'react';

const useInput = (initialForm: any) => {
  const [form, setForm] = useState(initialForm);
  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setForm({ ...form, [name]: value });
    },
    [form, setForm]
  );

  return [form, setForm, onChange];
};

export default useInput;
