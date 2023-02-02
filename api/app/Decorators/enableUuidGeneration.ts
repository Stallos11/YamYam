import Config from "@ioc:Adonis/Core/Config";

export const enableUuidGeneration = () => {
  return function (target: Function, key: string, descriptor: any) {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
      Config.set("app.enableUuidGeneration", false);
      const result = originalMethod.apply(this, args).then((e) => {
        Config.set("app.enableUuidGeneration", true);
      });

      return result;
    };

    return descriptor;
  };
};
