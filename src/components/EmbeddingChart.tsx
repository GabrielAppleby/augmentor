import React, {useEffect, useRef} from "react";
import * as d3 from 'd3';


// If you mess with any of these you need
// to regenerate background colored images
// :(
const BUFFER_PROPORTION = 1 / 20;
const MARGINS_PROPORTION = 1 / 8;
const CIRCLE_R = 2;
const colors = d3.scaleOrdinal(d3.schemeCategory10);
const WIDTH = 480;
const HEIGHT = 480;

// const getImageBounds = (minX: number,
//                         maxX: number,
//                         xScaleBuffer: number,
//                         minY: number,
//                         maxY: number,
//                         yScaleBuffer: number) => {
//     console.log(minX - xScaleBuffer);
//     console.log(Math.abs(minX - xScaleBuffer) + Math.abs(maxX + xScaleBuffer));
//     console.log(minY - yScaleBuffer);
//     console.log(Math.abs(maxY + yScaleBuffer) + Math.abs(minY - yScaleBuffer));
// }

interface EmbeddingChartProps {
    readonly data: number[][];
}

export const EmbeddingChart: React.FC<EmbeddingChartProps> = (props) => {
    const d3Container = useRef(null);

    const coords = props.data;


    useEffect(() => {
        if (coords) {
            const margins = WIDTH * MARGINS_PROPORTION;
            const getX = (d: number[]) => d[0];
            const getY = (d: number[]) => d[1];
            const minX = d3.min(coords, getX);
            const maxX = d3.max(coords, getX);
            const minY = d3.min(coords, getY);
            const maxY = d3.max(coords, getY);

            if (minX && maxX && minY && maxY) {
                const xScaleBuffer = (maxX - minX) * BUFFER_PROPORTION;
                const yScaleBuffer = (maxY - minY) * BUFFER_PROPORTION;

                const xScale = d3.scaleLinear()
                    .domain([minX - xScaleBuffer, maxX + xScaleBuffer])
                    .range([margins, (WIDTH - margins)]);
                const yScale = d3.scaleLinear()
                    .domain([minY - yScaleBuffer, maxY + yScaleBuffer])
                    .range([(HEIGHT - margins), margins]);
                const xAxis = d3.axisBottom(xScale);
                const yAxis = d3.axisLeft(yScale);

                const rootG = d3.select(d3Container.current);
                rootG.selectAll('g').remove().exit();

                const circlesG = rootG.append('g');
                const xAxisG = rootG.append('g');
                const yAxisG = rootG.append('g');

                circlesG
                    .selectAll('circle')
                    .data(coords)
                    .enter()
                    .append('circle')
                    .attr('cx', function (d) {
                        return xScale(getX(d));
                    })
                    .attr('cy', function (d) {
                        return yScale(getY(d));
                    })
                    .attr('r', CIRCLE_R)
                    .style("stroke", "black")
                    .style("stroke-width", .25)
                    .style("fill", (d) => {
                        return colors(String(d[2]));
                    });

                xAxisG
                    .attr("class", "axis")
                    .attr("transform", "translate(0," + (HEIGHT - margins) + ")")
                    .call(xAxis);

                yAxisG
                    .attr("class", "axis")
                    .attr("transform", "translate(" + margins + ", 0)")
                    .call(yAxis);
            }

        }
    }, [coords]);

    return (
        <svg ref={d3Container} width={WIDTH} height={HEIGHT}/>
    )

}
