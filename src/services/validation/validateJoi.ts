import _ from 'lodash';
import Joi from 'joi';
import ValidationException from '../../exceptions/validation';

export default (data: any, schema: Joi.Schema) => {
    const result = schema.validate(data, {
        abortEarly: false,
        stripUnknown: true,
    });

    if (result && result.error && result.error.details) {
        throw new ValidationException(
            result.error.details.map((detail) => {
                const key = detail.path.join('.');
                const filterFromMessage = `"${key}" `;

                return ValidationException.validationError(
                    key,
                    _.upperFirst(
                        detail.message.startsWith(filterFromMessage)
                            ? detail.message.substring(filterFromMessage.length)
                            : detail.message
                    ),
                    ValidationException.validationTypes.INVALID_PARAMETER
                );
            })
        );
    }

    return result.value;
};
