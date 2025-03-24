import questions from "./questions";
import results from "./results";
import misc from "./misc";

const translation = {...questions, ...results, ...misc};

const es = {
    translation: translation,
}

export default es;