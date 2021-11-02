import React from 'react';

const useUpdateEffect: typeof React.useEffect = (effect, deps = []) => {
  const isMounted = React.useRef(false);
  React.useEffect(() => {
    if (isMounted.current) {
      return effect();
    } else {
      isMounted.current = true;
    }
  }, [isMounted, ...deps]);
};

export default useUpdateEffect;
