"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DOBValidation = void 0;
class DOBValidation {
    static getMinimumDOB() {
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth();
        const currentDay = currentDate.getDate();
        const minimumDOB = new Date(currentYear - 18, currentMonth, currentDay).toDateString();
        return minimumDOB; // 2003-03-19
    }
}
exports.DOBValidation = DOBValidation;
//# sourceMappingURL=dob-validation.js.map