import React from 'react';
import { MdPreview } from '~~/index';
import { Theme } from '../App';
import mdText from '../data.md';

interface PreviewOnlyProp {
  theme: Theme;
  previewTheme: string;
  codeTheme: string;
}

const PreviewOnly = (props: PreviewOnlyProp) => {
  return (
    <div className="doc">
      <div className="container">
        <MdPreview
          theme={props.theme}
          previewTheme={props.previewTheme}
          codeTheme={props.codeTheme}
          modelValue={mdText}
          showCodeRowNumber
        />
      </div>
    </div>
  );
};

export default PreviewOnly;
