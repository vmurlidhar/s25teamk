import questions from "./questions";
import results from "./results";
import welcome from "./welcome";

const translation = {...questions, ...results, ...welcome};

const es = {
    translation: translation,
}

export default es;