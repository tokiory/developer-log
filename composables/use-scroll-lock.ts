const lock = () => {
  document.body.style.overflow = "hidden";
};

const unlock = () => {
  document.body.style.overflow = "";
};

const useScrollLock = () => {
  return {
    lock,
    unlock,
  };
};

export default useScrollLock;
