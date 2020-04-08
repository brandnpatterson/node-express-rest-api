import React from 'react';
import { render } from 'react-dom';
import TextField from './TextField';

const App: React.FC = () => {
  return (
    <div>
      <TextField
        text="Hello, typescript!"
        handleChange={e => {
          console.log(e.target.value);
        }}
      />
    </div>
  );
};

render(<App />, document.getElementById('root'));
