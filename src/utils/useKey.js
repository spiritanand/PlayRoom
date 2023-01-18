import {
  useEffect,
  useRef
} from "react";

export function useKey(keyCode, cb) {
  const cbRef = useRef();
  useEffect(() => {
	cbRef.current = cb;
  });
  
  useEffect(() => {
	function handle(event) {
	  if (event.code === keyCode)
		cbRef.current(event);
	}
	
	document.addEventListener("keypress", handle);
	
	return () => {
	  document.removeEventListener("keypress", handle);
	};
  }, [keyCode]);
  
}