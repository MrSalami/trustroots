import React from 'react';
import PropTypes from 'prop-types';
import { ToggleButton, ToggleButtonGroup } from 'react-bootstrap';
import '@/config/client/i18n';
import { useTranslation } from 'react-i18next';
import Report from './Report';

export default function Recommend({
  primaryInteraction,
  recommend,
  report,
  reportMessage,
  onChangeRecommend,
  onChangeReport,
  onChangeReportMessage,
}) {
  const { t } = useTranslation('references');

  const recommendQuestions = {
    hostedMe: t('Did you feel comfortable being hosted by them?'),
    hostedThem: t('Did you feel comfortable hosting them?'),
    met: t('Did you feel comfortable meeting them?'),
  };

  const question = recommendQuestions[primaryInteraction];

  return (
    <div className="panel panel-default">
      <div className="panel-heading">
        <h4 id="did-you-feel-comfortable-question">{question}</h4>
      </div>
      <div className="panel-body">
        <ToggleButtonGroup
          type="radio"
          name="recommend"
          onChange={onChangeRecommend}
          value={recommend}
          aria-labelledby="did-you-feel-comfortable-question"
        >
          <ToggleButton
            className="btn btn-lg recommend-reply-button"
            aria-checked={recommend === 'yes'}
            value="yes"
            bsStyle="default"
            bsSize="large"
          >
            {t('Yes')}
          </ToggleButton>
          <ToggleButton
            className="btn btn-lg recommend-reply-button"
            aria-checked={recommend === 'no'}
            value="no"
            bsStyle="default"
            bsSize="large"
          >
            {t('No')}
          </ToggleButton>
          <ToggleButton
            className="btn btn-lg recommend-reply-button"
            aria-checked={recommend === 'unknown'}
            value="unknown"
            bsStyle="default"
            bsSize="large"
          >
            {t("I don't know")}
          </ToggleButton>
        </ToggleButtonGroup>

        {recommend === 'no' && (
          <Report
            onChangeReport={onChangeReport}
            onChangeReportMessage={onChangeReportMessage}
            report={report}
            reportMessage={reportMessage}
          />
        )}
      </div>
    </div>
  );
}

Recommend.propTypes = {
  primaryInteraction: PropTypes.string.isRequired,
  recommend: PropTypes.string,
  report: PropTypes.bool.isRequired,
  reportMessage: PropTypes.string.isRequired,
  onChangeRecommend: PropTypes.func.isRequired,
  onChangeReport: PropTypes.func.isRequired,
  onChangeReportMessage: PropTypes.func.isRequired,
};
