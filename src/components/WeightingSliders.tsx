import React from "react";
import {Slider, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

interface WeightingSlidersProps {
    readonly columnNames: string[] | undefined,
    readonly weights: Record<string, number> | undefined,
    readonly handleWeightsChange: (key: string, value: number) => void;

}

const useStyles = makeStyles({
    slidersDiv: {
        margin: "auto",
        textAlign: "center"
    }
});

const Test: React.FC<WeightingSlidersProps> = ({columnNames, weights, handleWeightsChange}) => {

    const classes = useStyles();

    return (
        <div className={classes.slidersDiv}>
            {columnNames && columnNames.map(
                (key) => {
                    return (
                        <div key={`div_${key}`}>
                            <Typography id={`typography_${key}`} gutterBottom>
                                {key}
                            </Typography>
                            <Slider key={`slider_${key}`} min={-10} step={.01} max={10} value={weights ? weights[key] : 1}
                                    valueLabelDisplay={"auto"}
                                    onChangeCommitted={(event, newValue) => {
                                        handleWeightsChange(key, newValue as number)
                                    }}/>
                        </div>
                    )
                }
            )}
        </div>
    );
}

export const WeightingSliders = React.memo(Test);