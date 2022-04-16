class DOBValidation {
  static getMinimumDOB(): string {
    const currentDate = new Date();
    const currentYear: number = currentDate.getFullYear();
    const currentMonth: number = currentDate.getMonth();
    const currentDay: number = currentDate.getDate();
    const minimumDOB: string = new Date(
      currentYear - 18,
      currentMonth,
      currentDay,
    ).toDateString();
    return minimumDOB; // 2003-03-19
  }
}

export { DOBValidation };
