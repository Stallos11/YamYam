import Config from "@ioc:Adonis/Core/Config";

export const disableUuidGeneration = () => {
  return function (target: Function, key: string, descriptor: any) {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
      Config.set("app.disableUuidGeneration", false);

      console.log(
        "Config set to false:",
        Config.get("app.disableUuidGeneration")
      );
      const result = originalMethod.apply(this, args);
      Config.set("app.disableUuidGeneration", true);

      return result;
    };

    return descriptor;
  };
};
