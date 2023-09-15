import Config from "@ioc:Adonis/Core/Config";

export const enableUuidGeneration = () => {
  //@ts-ignore
  return function (target: Function, key: string, descriptor: any) {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
      Config.set("app.enableUuidGeneration", false);
      const result = originalMethod.apply(this, args).then(() => {
        Config.set("app.enableUuidGeneration", true);
      });

      return result;
    };

    return descriptor;
  };
};
