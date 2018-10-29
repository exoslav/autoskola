const compose = (...functions) =>
  initialValue =>
    functions
      .reduceRight((value, func) => func(value), initialValue);

export default compose;
