import React, { useState, useEffect } from 'react'
import { style } from './style'
import { css } from 'aphrodite/no-important'
import * as d3 from 'd3'

/**
 */
export default function Relationshap() {
    return (
        <div className={css(style.Relationshap)}>
            <D3Tty />
        </div>
    )
}

function D3Tty() {
    useEffect(() => {
        const width = 900
        const height = 900

        const data = {
            nodes: [
                { id: 1, fx: width / 2, fy: height / 2 },
                { id: 2 },
                { id: 3 },
                { id: 4 },
                { id: 5 },
                { id: 6 },
                { id: 7 },
            ],
            links: [
                { target: 2, source: 1 },
                { target: 3, source: 1 },
                { target: 4, source: 1 },
                { target: 5, source: 2 },
                { target: 6, source: 3 },
                { target: 7, source: 3 },
            ],
        }
        const links = data.links.map((d) => Object.create(d))
        const nodes = data.nodes.map((d) => Object.create(d))
        const simulation = d3
            .forceSimulation(nodes)
            .force(
                'link',
                d3.forceLink(links).id((d: any) => d.id),
            )

            .force('charge', d3.forceManyBody().strength(-5000))
            .force('center', d3.forceCenter(width / 2, height / 2))

        const svg = d3
            .select('#d3ttt')
            .append('svg')
            .attr('viewBox', [0, 0, width + 0, height + 0].join(' '))
            .attr('preserveAspectRatio', 'xMidYMid meet')
            // style="width:150px; height:300px"
            .attr('style', 'width:800px; height:800px')

        const link = svg
            .append('g')
            .attr('stroke', '#999')
            .attr('stroke-opacity', 0.6)
            .selectAll('line')
            .data(links)
            .join('line')
            .attr('stroke-width', 2)

        const node = svg
            .append('g')
            .attr('stroke', '#fff')
            .attr('stroke-width', 1.5)
            .selectAll('circle')
            .data(nodes)
            .join('circle')
            .attr('r', 40)
            .attr('fill', 'red')
        const name_txt = svg
            .selectAll('.linetext')
            .data(nodes)
            .enter()
            .append('text')
            .text(function (d) {
                return d.id + '龙傲天'
            })

        node.append('title').text((d) => d.id)

        simulation.on('tick', () => {
            link.attr('x1', (d) => d.source.x | 0)
                .attr('y1', (d) => d.source.y | 0)
                .attr('x2', (d) => d.target.x | 0)
                .attr('y2', (d) => d.target.y | 0)

            node.attr('cx', (d) => d.x | 0).attr('cy', (d) => d.y | 0)
            name_txt
                .attr('x', (d) => d.x | 0)
                .attr('y', (d) => d.y | 0)
                .attr('style', 'dominant-baseline:middle;text-anchor:middle;')
            // svg.select('circle')
            //     .filter((v: any) => v.id === 1)
            //     .attr('cx', width / 2)
            //     .attr('cy', height / 2)
        })

        // const width = 800
        // const height = 600
        // const root: any = {
        //     nodes: [
        //         { name: '云天河', image: 'tianhe.png' },
        //         { name: '韩菱纱', image: 'lingsha.png' },
        //         { name: '柳梦璃', image: 'mengli.png' },
        //         { name: '慕容紫英', image: 'ziying.png' },
        //     ],
        //     edges: [
        //         { source: 0, target: 1, relation: '挚友' },
        //         { source: 0, target: 2, relation: '挚友' },
        //         { source: 0, target: 3, relation: '挚友' },
        //     ],
        // }
        // const force = d3
        //     .forceSimulation()
        //     .nodes(root.nodes)
        //     .links(root.edges)
        //     .size([width, height])
        //     .linkDistance(200)
        //     .charge(-1500)
        //     .start()

        // const links: any[] = root.links()
        // const nodes: any[] = root.descendants()
        // const simulation = d3
        //     .forceSimulation(nodes)
        //     .force(
        //         'link',
        //         d3
        //             .forceLink(links)
        //             .id((d: any) => d.id)
        //             .distance(0)
        //             .strength(1),
        //     )
        //     .force('charge', d3.forceManyBody().strength(-10000))
        //     .force('x', d3.forceX())
        //     .force('y', d3.forceY())
        // const svg = d3
        //     .select('#d3ttt')
        //     .append('svg')
        //     .attr('viewBox', [-width / 2, -height / 2, width, height] as any)

        // const node = svg
        //     .append('g')
        //     .attr('stroke', '#fff')
        //     .attr('stroke-width', 1.5)
        //     .selectAll('circle')
        //     .data(nodes)
        //     .join('circle')
        //     .attr('r', 10)
        //     .attr('fill', 'green')
        // node.append('title').text((d) => d.data.name)
        // const link = svg
        //     .append('g')
        //     .attr('stroke', '#999')
        //     .attr('stroke-opacity', 0.6)
        //     .selectAll('line')
        //     .data(links)
        //     .join('line')
        // // .attr('', 50)
        // simulation.on('tick', () => {
        //     link.attr('x1', (d) => d.source.x)
        //         .attr('y1', (d) => d.source.y)
        //         .attr('x2', (d) => d.target.x)
        //         .attr('y2', (d) => d.target.y)

        //     node.attr('cx', (d) => d.x).attr('cy', (d) => d.y)
        // })
        return () => {
            svg.remove()
        }
    }, [])

    return (
        <div
            id="d3ttt"
            style={{
                margin: 60,
                width: 800,
                height: 800,
                backgroundColor: 'green',
                fontSize: 14,
            }}
        ></div>
    )
}
