import React from "react";
import {TextField} from "@material-ui/core";
import {UMAPParameters} from "umap-js";
import {useForm} from "react-hook-form";
import {makeStyles} from "@material-ui/core/styles";

interface UmapControlProps {
    readonly params: UMAPParameters,
    readonly handleParamsChange: (data: UMAPParameters) => void;
}

const useStyles = makeStyles({
    submitDiv: {
        margin: "auto",
        textAlign: "center"
    },
    formItemDiv: {
        margin: "auto",
        textAlign: "center"
    }
});

const _UmapControl: React.FC<UmapControlProps> = ({params, handleParamsChange}) => {
    const {register, handleSubmit, errors} = useForm();

    const classes = useStyles();
    console.log("Umap Control");

    return (
        <form onSubmit={handleSubmit(handleParamsChange)}>
            <div className={classes.formItemDiv}>
                {Object.entries(params).map(
                    ([key, value]) => {
                        return <TextField
                            error={errors[key]}
                            inputRef={register({
                                required: true,
                                validate: (item) => !isNaN(item)
                            })}
                            id={key}
                            name={key}
                            key={`textfield_${key}`}
                            label={key}
                            defaultValue={value}
                        />;
                    }
                )}
            </div>
            <div className={classes.submitDiv}>
                <input type="submit"/>
            </div>
        </form>
    );
}

export const UmapControl = React.memo(_UmapControl);