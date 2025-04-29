import React, { useCallback, useContext } from 'react';
import { FONT_FAMILY, FONT_WEIGHT } from '../../data';
import SelectBox from '../common/SelectBox';
import { setFontSettingContext } from '../../contexts/glyph-set-sec';

const Header = () => {
  return (
    <div className="glyph-set-sec__header">
      <FontSelectBox />
    </div>
  );
};

const options = FONT_FAMILY.flatMap((ff) =>
  FONT_WEIGHT.map((fw, i) => ({
    option: `${ff} ${fw}`,
    props: { 'data-fw': (i + 1) * 100 },
  }))
);

const FontSelectBox = () => {
  const setFontSetting = useContext(setFontSettingContext);

  const handleSelect = useCallback((target) => {
    const [ff] = target.textContent.split(' ');
    const fw = target.dataset.fw;

    setFontSetting({ ff, fw });
  }, []);

  return (
    <SelectBox
      defaultOption="sans extra light"
      options={options}
      handleSelect={handleSelect}
      label="select font"
    ></SelectBox>
  );
};

export default Header;
