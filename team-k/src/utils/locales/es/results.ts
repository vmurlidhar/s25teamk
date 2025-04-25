const results = {
  parkinsonsDisease: {
    name: "Enfermedad de Parkinson",
    symptoms:
      "<ul><li>Temblor</li><li>Movimiento lento</li><li>Músculos rígidos</li><li>Mala postura</li><li>Pérdida de movimiento automático</li><li>Habla arrastrada</li><li>Cambios en la escritura</li><li>Depresión</li><li>Problemas de equilibrio</li><li>Pérdida del control de la vejiga o intestinos</li><li>Problemas de sueño</li></ul>",
    treatment:
      "La enfermedad de Parkinson no tiene cura, pero los medicamentos pueden ayudar a controlar los síntomas. Los medicamentos a menudo funcionan muy bien. Cuando los medicamentos ya no ayudan, algunas personas pueden someterse a cirugía. Su equipo médico también puede recomendar ejercicio aeróbico, fisioterapia enfocada en el equilibrio y estiramiento, y terapia del habla.",
  },
  als: {
    name: "Esclerosis Lateral Amiotrófica (ELA)",
    symptoms:
      "<ul><li>Dificultad para caminar</li><li>Debilidad en piernas/tobillos/pies</li><li>Debilidad o torpeza en habilidades finas de las manos</li><li>Habla arrastrada</li><li>Dificultad para tragar</li><li>Calambres y espasmos musculares (brazos, hombros, lengua)</li><li>Inestabilidad emocional (llanto o risa inapropiados)</li><li>Cambios en el pensamiento o comportamiento</li></ul>",
    treatment:
      "Los tratamientos no pueden revertir el daño de la ELA, pero pueden ralentizar la progresión de los síntomas. También pueden ayudar a prevenir complicaciones y hacer que se sienta más cómodo e independiente. Es posible que necesite un equipo de proveedores de atención médica y médicos capacitados en muchas áreas. El equipo trabaja junto para prolongar su vida y mejorar su calidad de vida. Usted tiene derecho a aceptar o rechazar cualquier tratamiento que se le sugiera.",
  },
  alzheimersDisease: {
    name: "Enfermedad de Alzheimer",
    symptoms:
      "<ul><li>Pérdida de memoria</li><li>Dificultad para concentrarse y pensar</li><li>Toma de decisiones y juicio deficientes</li><li>Dificultad para planificar y realizar tareas familiares</li><li>Depresión</li><li>Aislamiento social</li><li>Cambios de humor</li><li>Problemas de sueño</li></ul>",
    treatment:
      "Los tratamientos para la enfermedad de Alzheimer incluyen medicamentos que pueden ayudar con los síntomas y medicamentos más nuevos que pueden ralentizar el deterioro del pensamiento y funcionamiento. Estos nuevos medicamentos están aprobados para personas con Alzheimer en etapa temprana.",
  },
  multipleSclerosis: {
    name: "Esclerosis Múltiple",
    symptoms:
      "<ul><li>Entumecimiento</li><li>Debilidad muscular</li><li>Dificultad para caminar</li><li>Visión borrosa, doble o pérdida de visión</li></ul>",
    treatment:
      "No existe cura para la esclerosis múltiple. El tratamiento generalmente se enfoca en acelerar la recuperación de los ataques, reducir las recaídas, ralentizar la progresión de la enfermedad y controlar los síntomas. Algunas personas tienen síntomas tan leves que no necesitan tratamiento.",
  },
  huntingtonsDisease: {
    name: "Enfermedad de Huntington",
    symptoms:
      "<ul><li>Movimientos involuntarios (corea)</li><li>Dificultad para enfocar la vista</li><li>Dificultad para caminar</li><li>Problemas de equilibrio</li><li>Dificultad para tragar</li><li>Falta de control de los impulsos</li><li>Dificultad para organizar/priorizar/enfocar</li><li>Depresión</li><li>Trastorno obsesivo-compulsivo</li><li>Manía</li><li>Mala postura</li><li>Habla arrastrada</li><li>Movimientos oculares incontrolables</li></ul>",
    treatment:
      "No hay tratamientos que puedan cambiar el curso de la enfermedad de Huntington. Pero los medicamentos pueden aliviar algunos síntomas de movimiento y condiciones de salud mental. Varias intervenciones también pueden ayudar a una persona a adaptarse a los cambios en sus habilidades por un tiempo determinado.",
  },
  ataxia: {
    name: "Ataxia",
    symptoms:
      "<ul><li>Mala coordinación</li><li>Problemas de equilibrio</li><li>Dificultad para caminar</li><li>Debilidad o torpeza en habilidades finas de las manos</li><li>Habla arrastrada</li><li>Movimientos oculares incontrolables</li><li>Dificultad para tragar</li></ul>",
    treatment:
      "El tratamiento de la ataxia depende de la causa. Si la ataxia es causada por una afección como deficiencia de vitaminas o enfermedad celíaca, tratar esa afección puede mejorar los síntomas. Si la ataxia resulta de la varicela u otras infecciones virales, probablemente se resolverá por sí sola.",
  },
  motorNeuronDisease: {
    name: "Enfermedad de las Neuronas Motoras (ENM)",
    symptoms:
      "<ul><li>Debilidad en piernas/tobillos/pies</li><li>Habla arrastrada</li><li>Dificultad para tragar</li><li>Calambres y espasmos musculares</li><li>Pérdida de peso</li><li>Inestabilidad emocional (llanto o risa inapropiados)</li></ul>",
    treatment:
      "No existe cura para la enfermedad de las neuronas motoras, pero el tratamiento puede ayudar a reducir el impacto de los síntomas en su vida. El cuidado normalmente involucra un equipo de especialistas, incluido un médico general.",
  },
  multipleSystemAtrophy: {
    name: "Atrofia Multisistémica (AMS)",
    symptoms:
      "<ul><li>Temblores</li><li>Dificultad para caminar</li><li>Músculos rígidos</li><li>Problemas de equilibrio</li><li>Pérdida de movimiento automático</li><li>Habla arrastrada</li><li>Visión borrosa, doble o pérdida de visión</li><li>Dificultad para tragar</li><li>Presión arterial baja</li><li>Pérdida del control de la vejiga o intestinos</li><li>Disminución de la sudoración</li><li>Problemas de sueño</li><li>Pérdida del interés sexual</li><li>Inestabilidad emocional (llanto o risa inapropiados)</li><li>Mala postura</li></ul>",
    treatment:
      "El tratamiento para la atrofia multisistémica (AMS) implica manejar los síntomas. No existe cura para la AMS. El manejo de la enfermedad puede hacerlo lo más cómodo posible y ayudarle a mantener las funciones de su cuerpo.",
  },
  progressiveSupranuclearPalsy: {
    name: "Parálisis Supranuclear Progresiva (PSP)",
    symptoms:
      "<ul><li>Problemas de equilibrio</li><li>Dificultad para enfocar la vista</li><li>Músculos rígidos</li><li>Habla arrastrada</li><li>Dificultad para tragar</li><li>Sensibilidad a la luz brillante</li><li>Problemas de sueño</li><li>Inestabilidad emocional (llanto o risa inapropiados)</li><li>Dificultad para concentrarse y pensar</li><li>Depresión</li><li>Expresión facial característica de sorpresa o susto</li><li>Mareos</li></ul>",
    treatment:
      "Aunque no hay cura para la parálisis supranuclear progresiva, hay tratamientos disponibles que pueden ayudar a aliviar los síntomas del trastorno.",
  },
};

export default results;
