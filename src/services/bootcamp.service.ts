import type { Bootcamp } from "@/types";

const bootcampService = {
  getAll: async (): Promise<Bootcamp[]> => {
    return [
      {
        id: "3cab6207b819494bbbc8e85e3f1c2ce8",
        title: "Devops Engineer",
      },
    ];
  },
};

export default bootcampService;
