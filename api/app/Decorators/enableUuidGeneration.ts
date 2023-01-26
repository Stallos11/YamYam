import Config from "@ioc:Adonis/Core/Config";

export const enableUuidGeneration = () => {
  return function (target: Function, key: string, descriptor: any) {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
      // console.log(`Entering ${key} method`);
      console.log("début décorateur", Config.get("app.enableUuidGeneration"));

      Config.set("app.enableUuidGeneration", false);
      const result = originalMethod.apply(this, args).then((e) => {
        Config.set("app.enableUuidGeneration", true);
        console.log("fin decorateur", Config.get("app.enableUuidGeneration"));
      });

      return result;
    };

    return descriptor;
  };
};
