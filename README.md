# Small World Graph Demo

This application is an educational tool designed to introduce the **Small-World Graph** concept to high school students. It allows users to interactively build and evaluate graphs on a world map, demonstrating how a few "long-range shortcuts" can significantly reduce the average path length between nodes.

## Interactive Features

- **Node Interaction**: Click on a node to select it. Click on a second node to create an edge between them.
- **Edge Interaction**: Click on an existing edge to remove it.
- **Visual Feedback**: The start node (Node 0) is highlighted in red. Selected nodes are highlighted in orange.

## Button Actions

The interface includes several buttons to control the graph state (labeled in Hungarian):

- **Élek törlése (Clear Edges)**: Removes all edges from the graph, resetting it to an empty state.
- **Random gráf generálás (Random Graph)**: Generates edges randomly between nodes with a fixed probability.
- **Kis világ gráf generálás (Small World Graph)**: Generates a predefined graph structure that mimics a small-world network, featuring local clusters and strategic long-range connections.
- **Kiértékelés (Evaluation)**: Calculates the current graph's metrics and adds the result to the chart and leaderboard.

## Metrics Explained

- **Edge Count**: The total number of connections in the graph.
- **Average Path Length**: The average number of steps required to reach all other nodes from the starting node.
- **Clustering Coefficient**: A measure of the degree to which nodes in a graph tend to cluster together.
- **Score (Points)**: A metric used to compare different graph topologies. In this demo, score is calculated as `Edges * Average Path * 10`. A lower score typically indicates a more efficient "Small World" network.
