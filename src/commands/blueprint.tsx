export const blueprint = async (params: string[], out: any) => {
  //params - an array of strings,where you will find all the supplied parameters to the command
  //out - a class where you will find 3 things
  //      out.write - a function that you can use to write to the output "stream", it accepts a string as parameter
  //      out.end - a function that must be called to end the exxecution of your command, it ends the Promise , and you should only call it once during the execution of your command
  //      store - with the help of this, you can acces all the methods inside the store
  // after you finished writing and testing your command, you should visit index.tsx from this folder and import your file, write the name of your command in the avableCommands array and the name of your file in the commands object
};
