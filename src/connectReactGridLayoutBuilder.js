import React, { Component, PropTypes } from "react";
import _ from "lodash";

function getReactGridLayoutFromProps(props) {
  var {children, updateConfigFunc, ...reactGridLayout} = props;
  return reactGridLayout;
}
var connectReactGridLayoutBuilder = ReactGridLayout => class extends Component {
  static propTypes = Object.assign({}, ReactGridLayout.propTypes, {
    updateConfigFunc: PropTypes.func.isRequired
  })

  // Callback so you can save the layout.
  onLayoutChange = (currentLayout, allLayouts) => {
    var reactGridLayout = _.cloneDeep(getReactGridLayoutFromProps(this.props));
    reactGridLayout.layouts = allLayouts;
    if (this.props.onLayoutChange) {
      this.props.onLayoutChange(currentLayout, allLayouts)
    }
    this.props.updateConfigFunc(reactGridLayout);
  }
  // Calls when drag starts.
  onDragStart = (layout, oldItem, newItem, placeholder, e, element) => {
    if (this.props.onDragStart) {
      this.props.onDragStart(layout, oldItem, newItem, placeholder, e, element)
    }
  }
  // Calls on forEach drag movement.
  onDrag = (layout, oldItem, newItem, placeholder, e, element) => {
    if (this.props.onDrag) {
      this.props.onDrag(layout, oldItem, newItem, placeholder, e, element)
    }
  }
  // Calls when drag is complete.
  onDragStop = (layout, oldItem, newItem, placeholder, e, element) => {
    var reactGridLayout = _.clone(getReactGridLayoutFromProps(this.props));
    if (this.props.onDragStop) {
      this.props.onDragStop(layout, oldItem, newItem, placeholder, e, element)
    }
    var areSameItem = (itemA, itemB) => {
      return itemA.x === itemB.x && itemA.y === itemB.y;
    }
    if (reactGridLayout.layout) {
      reactGridLayout.layout = _.map(reactGridLayout.layout, (item) => {
        if (areSameItem(item, oldItem)) {
          return newItem;
        }
        return item
      })
    }
    if (reactGridLayout.layouts) {
      _.forEach(reactGridLayout.layouts, (layout, key) => {
        reactGridLayout.layouts[key] = _.map(layout, (item) => {
          if (areSameItem(item, oldItem)) {
            return newItem;
          }
          return item
        })
      })
    }
    this.props.updateConfigFunc(reactGridLayout);
  }
  // Calls when resize starts.
  onResizeStart = (layout, oldItem, newItem, placeholder, e, element) => {
    if (this.props.onResizeStart) {
      this.props.onResizeStart(layout, oldItem, newItem, placeholder, e, element)
    }
  }
  // Calls when resize movement happens.
  onResize = (layout, oldItem, newItem, placeholder, e, element) => {
    if (this.props.onResize) {
      this.props.onResize(layout, oldItem, newItem, placeholder, e, element)
    }
  }
  // Calls when resize is complete.
  onResizeStop = (layout, oldItem, newItem, placeholder, e, element) => {
    if (this.props.onResizeStop) {
      this.props.onResizeStop(layout, oldItem, newItem, placeholder, e, element)
    }
  }
  // Callback when the width changes, so you can modify the layout as needed.
  onWidthChange = (containerWidth, margin, cols) => {
    if (this.props.onWidthChange) {
      this.props.onWidthChange(containerWidth, margin, cols)
    }
  }
  // Calls back with breakpoint and new # cols
  onBreakpointChange = (newBreakpoint, newCols) => {
    if (this.props.onBreakpointChange) {
      this.props.onBreakpointChange(newBreakpoint, newCols);
    }
  }

  // Callback so you can save the layout.
  // AllLayouts are keyed by breakpoint.
  onLayoutChange = (currentLayout, allLayouts) => {
    var reactGridLayout = _.clone(getReactGridLayoutFromProps(this.props));
    if (this.props.onLayoutChange) {
      this.props.onLayoutChange(currentLayout, allLayouts);
    }
    if (reactGridLayout.layouts) {
      reactGridLayout.layouts = allLayouts;
    }
  }

  render() {
    var {children, updateConfigFunc, ...reactGridLayout} = this.props;

    return (
      <ReactGridLayout
        {...reactGridLayout}
        onDragStart={this.onDragStart}
        onDrag={this.onDrag}
        onDragStop={this.onDragStop}
        onResizeStart={this.onResizeStart}
        onResizeStart={this.onResizeStart}
        onResize={this.onResize}
        onResizeStop={this.onResizeStop}
        onWidthChange={this.onWidthChange}
        onBreakpointChange={this.onBreakpointChange}
        onLayoutChange={this.onLayoutChange}
        >
        {children}
      </ReactGridLayout>
    );
  }
};
export default connectReactGridLayoutBuilder;