import { useCallback, useEffect, useRef, useState } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [isNumberAllowed, setIsNumberAllowed] = useState(false);
  const [isCharAllowed, setIsCharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const [copy, setCopied] = useState(false);
  //? using the useRef hook for getting the Referenceing of the  current password...
  const passwordRef = useRef(null);

  //! -------creating the method.....for generating the password
  const passwordGeneratoring = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    //* checking if numbers are availiable for password string...
    if (isNumberAllowed) str += "0123456789";
    if (isCharAllowed) str += "~!@#$%^&*/";
    //charAllowed means to allow he spectial characters from the key borad...
    for (let i = 1; i <= length; i++) {
      let poisition = Math.floor(Math.random() * str.length + 1);
      //? Gettig the Random poistion for the string alphabets
      pass += str.charAt(poisition);
    }
    setPassword(pass);
  }, [length, isNumberAllowed, isCharAllowed, setPassword]);
  useEffect(() => {
    passwordGeneratoring();
  }, [length, isNumberAllowed, isCharAllowed, setPassword]);

  //? useCallback is the hook for memoizing the method's rendering and it's current condition...
  const copyPasswordtoClipBoard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 9);
    window.navigator.clipboard.writeText(password);
    setCopied((prev) => !prev);
  }, [password, setCopied, setPassword]);
  return (
    <>
      <div className="w-full p-4 bg-gray-700 text-orange-600 max-w-md my-8 mx-auto shadow-md rounded-lg">
        <h1 className="text-white text-center p-2 font-sans">
          Password Generator
        </h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            onChange={(e) => {}}
            value={password}
            className="outline-none w-full py-1 px-3  text-xl"
            placeholder="password"
            readOnly
            ref={passwordRef}
          />
          <button
            className="bg-blue-700 text-white px-3 py-1 shrink-0 outline-none"
            onClick={copyPasswordtoClipBoard}
          >
            {copy === false ? "Copy" : "Copied"}
          </button>
        </div>
        <div className="gap-x-2 flex text-sm">
          <div className="gap-x-1 flex items-center">
            <input
              type="range"
              min="6"
              max="100"
              value={length}
              className="cursor-pointer"
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <label>Length : {length}</label>
          </div>
          <div className="flex gap-x-2">
            <input
              type="checkbox"
              defaultChecked={isNumberAllowed}
              id="numberAllowed"
              onChange={() => {
                setIsNumberAllowed((prev) => !prev);
              }}
            />
            <label>Numbers</label>
            <input
              type="checkbox"
              defaultChecked={isCharAllowed}
              id="CharAllowed"
              onChange={() => {
                setIsCharAllowed((prev) => !prev);
              }}
            />
            <label>Characters</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
