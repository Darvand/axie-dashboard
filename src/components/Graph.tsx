import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

type Data = Record<string, number>;

interface Props {
  data: Data[];
  dimensions: {
    width: number;
    height: number;
    margin: {
      top: number;
      left: number;
      right: number;
      bottom: number;
    };
  };
  valueKey: string;
  yAxisLabel?: string;
}

const Graph = ({ data, dimensions, valueKey, yAxisLabel }: Props) => {
  const { width, height, margin } = dimensions;
  const svgWidth = width + margin.left + margin.right;
  const svgHeight = height + margin.top + margin.bottom;
  const svgRef = useRef(null);

  useEffect(() => {
    const y = (d: Props["data"][0]) => d[valueKey];
    const x = (d: Props["data"][0]) => d.date;
    const Y = d3.map(data, y);
    const X = d3.map(data, x);

    const xDomain = d3.extent(X) as [number, number];
    const xRange = [margin.left, width - margin.right];
    const yDomain = [0, d3.max(Y)!];
    const yRange = [height - margin.bottom, margin.top];

    // Scales
    const xScale = d3.scaleUtc(xDomain, xRange);
    const yScale = d3.scaleLinear(yDomain, yRange);
    const xAxis = d3.axisBottom(xScale).ticks(5).tickSizeOuter(0);
    const yAxis = d3
      .axisRight(yScale)
      .ticks(4)
      .tickFormat((d) => `${d} ${yAxisLabel}`)
      .tickSize(-(width - margin.left - margin.right));

    const svg = d3
      .select(svgRef.current)
      .attr("width", width + margin.left + margin.right)
      .attr("height", height)
      .attr("style", "max-width: 100%; height: auto; height: intrinsic;");

    svg.selectAll("*").remove();
    svg
      .append("g")
      .attr("transform", `translate(0, ${height - margin.bottom})`)
      .call(xAxis)
      .attr("class", "text-secondary-text text-sm");
    svg
      .append("g")
      .attr("transform", `translate(${width - margin.right}, 0)`)
      .call(yAxis)
      .attr("class", "text-secondary-text text-sm graph-line font-bold")
      .call((g) => g.select(".domain").remove());
    const line = d3
      .line()
      .x((d) => xScale(d[0]))
      .y((d) => yScale(d[1]));
    // const lg = svg
    //   .append("defs")
    //   .append("linearGradient")
    //   .attr("id", "mygrad") //id of the gradient
    //   .attr("x1", "0")
    //   .attr("x2", "0%")
    //   .attr("y1", yScale(1))
    //   .attr("y2", yScale(300)); //since its a vertical linear gradient
    // lg.append("stop")
    //   .attr("offset", "0%")
    //   .style("stop-color", "#5D7ADD") //end in red
    //   .style("stop-opacity", 1);

    // lg.append("stop")
    //   .attr("offset", "100%")
    //   .style("stop-color", "#16233C") //start in blue
    //   .style("stop-opacity", 1);
    const area = d3
      .area()
      .x((d) => {
        return xScale(d[1]);
      })
      .y1((d) => {
        return yScale(d[0]);
      });
    area.y0(yScale(0));
    svg
      .append("linearGradient")
      .attr("id", "graph-gradient")
      .attr("gradientUnits", "userSpaceOnUse")
      .attr("x1", 0)
      .attr("y1", yScale(d3.max(Y)! * 0.1))
      .attr("x2", 0)
      .attr("y2", yScale(d3.max(Y)! / 2))
      .selectAll("stop")
      .data([
        {
          offset: "0%",
          color: "#16233C",
        },
        {
          offset: "100%",
          color: "#5D7ADD",
        },
      ])
      .enter()
      .append("stop")
      .attr("offset", function (d) {
        return d.offset;
      })
      .attr("stop-color", function (d) {
        return d.color;
      })
      .attr("stop-opacity", 0.5);
    svg
      .append("path")
      .datum(data.map(({ [valueKey]: value, date }) => [date, value]))
      .attr("fill", "url(#graph-gradient")
      .attr(
        "d",
        d3.area(
          (d) => xScale(d[0]),
          yScale(0),
          (d) => yScale(d[1])
        )
      );
    svg
      .append("path")
      .datum(data.map(({ [valueKey]: value, date }) => [date, value]))
      .attr("fill", "none")
      .attr("stroke", "#5D7ADD")
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round")
      .attr("stroke-width", 1.5)
      .attr(
        "d",
        line(data.map(({ [valueKey]: value, date }) => [date, value]))
      );
  }, [
    data,
    height,
    margin.bottom,
    margin.left,
    margin.right,
    margin.top,
    valueKey,
    width,
    yAxisLabel,
  ]);
  if (data.length === 0) return <div></div>;
  return (
    <svg ref={svgRef} width={svgWidth} height={svgHeight} className="text-lg" />
  );
};

export default Graph;
