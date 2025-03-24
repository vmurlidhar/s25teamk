import questions from "./questions";
import results from "./results";
import welcome from "./welcome";

const translation = {...questions, ...results, ...welcome};

const en = {
    translation: translation,
}

export default en;