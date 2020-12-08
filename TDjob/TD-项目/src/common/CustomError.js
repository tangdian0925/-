import _ from "lodash";
import i18n from "./I18n/language";

export default function CustomError(err) {
  this.details = _.get(err, "response.data.details");

  this.code = _.get(err, "response.data.code");

  this.message = _.get(err, "response.data.message") || err.message;

  if (/timeout of/.test(err.message)) {
    this.code = "timeout";
  }

  if (/Network Error /.test(err.message)) {
    this.code = "network";
  }

  const trans = i18n.t(`error.${this.code}`);

  // ('trans',trans);

  if (trans) {
    this.message = i18n.t(`error.${this.code}`, { ...this.details });
  } else {
    this.message =
      _.get(err, "response.data.message") ||
      err.message ||
      i18n.t("error.unknown");
  }
}
