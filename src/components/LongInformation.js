import React from 'react';
import Raw from './Raw';
import Computed from './Computed';
import Response from './Response';
import PropTypes from 'prop-types';

export default class LongInformation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 'raw',
    };
  }

  setView = (view) => this.setState({ view });
  render() {
    const { view } = this.state;
    const { entry, onRequestClose } = this.props;

    return (
      <div className="longInfoWrapper">
        <div className="optsBanner">
          <p onClick={onRequestClose}>x</p>
          <div className={`tab ${view === 'raw' && 'selected'}`} onClick={() => this.setView('raw')}>Raw Query</div>
          <div className={`tab ${view === 'computed' && 'selected'}`} onClick={() => this.setView('computed')}>Computed Query</div>
          <div className={`tab ${view === 'response' && 'selected'}`} onClick={() => this.setView('response')}>Response</div>
        </div>
        <div className="requestArea">
          {view === 'raw' && (
            <Raw
              query={entry.bareQuery}
              queryVariables={entry.queryVariables}
            />
          )}
          {view === 'computed' && entry.data && entry.data.map((request, i) => {
            if (request.kind !== 'FragmentDefinition') {
              return (
                <div className="longRequest" key={`computed-request-${i}`}>
                  <h3>{request.name}</h3>
                  <Computed request={request} fragments={entry.fragments} />
                </div>
              );
            }
          })}
          {view === 'computed' && !entry.data && (
            <p className="error">{entry}</p>
          )}
          {view === 'response' && (
            <Response
              response={entry.responseBody}
            />
          )}
        </div>
      </div>
    );
  }
}
LongInformation.propTypes = {
  entry: PropTypes.object.isRequired,
  onRequestClose: PropTypes.func.isRequired,
};
