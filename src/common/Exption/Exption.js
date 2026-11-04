
export const ApplicationException = (message = "error", options = { status: 400 }) => {
  throw new Error(message, { cause: options });
};

export const NotFoundException = (message = "NotFound", extra = {}) => {
  return ApplicationException(
    message, { status: 404, ...extra }
);
}

export const BadRequestExption=(message= "BadRequest" , extra={})=>{
    return ApplicationException(
        message,
        {status:400 , ...extra}
    )

}

export const TooManyRequest=(message= "TooRequestExption" , extra={})=>{
    return ApplicationException(
        message,{status:429 , ...extra}
    )

}
export const UnauthraziedExption=(message = "UnAutharized" , extra={})=>{
    return ApplicationException(
        message, {status:401 , ...extra}
    )

}


export const Forbidden=(message="Forbidden" , extra={})=>{
    return ApplicationException(
        message, {
            status:403,
            ...extra
        }
    )

}



