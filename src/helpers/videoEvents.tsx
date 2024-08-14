const isInteractiveAllowed = (interactive: boolean): void => { 
  if (!interactive) throw new Error("Sorry! You are not in interactive mode.");
};

export const onVideoStart = (data: Event, interactive = true): void => {
  isInteractiveAllowed(interactive);
  console.log("onVideoStart: ", data);
};

export const onVideoEnd = (data: Event, interactive = true): void => {
  isInteractiveAllowed(interactive);
  console.log("onVideoEnd: ", data);
};

export const onVideoResume = (data: Event, interactive = true): void => {
  isInteractiveAllowed(interactive);
  console.log("onVideoResume: ", data);
};

export const onVideoSeek = (data: Event, interactive = true): void => {
  isInteractiveAllowed(interactive);
  console.log("onVideoSeek: ", data);
};
