// src/components/Support/SupportForm.jsx
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { submitComplaint, selectLastTicket, clearLastTicket } from "../../redux/slices/supportSlice";
import "./SupportForm.css";

const ISSUE_KEYS = ["slow", "no_net", "cable", "router", "billing", "other"];

export default function SupportForm() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const lastTicket = useSelector(selectLastTicket);

  const [form, setForm] = useState({
    name: "", phone: "", area: "", issue: "", description: "",
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = "Required";
    if (!/^[6-9]\d{9}$/.test(form.phone)) errs.phone = "Enter valid 10-digit mobile number";
    if (!form.area.trim()) errs.area = "Required";
    if (!form.issue) errs.issue = "Select an issue type";
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    dispatch(submitComplaint(form));
    setSubmitted(true);
    setForm({ name: "", phone: "", area: "", issue: "", description: "" });
  };

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    setErrors((err) => ({ ...err, [e.target.name]: undefined }));
  };

  if (submitted && lastTicket) {
    return (
      <div className="support-success">
        <div className="support-success__icon">✅</div>
        <h3>{t("support.success")}<strong>{lastTicket}</strong>{t("support.success2")}</h3>
        <button
          className="btn btn--outline"
          onClick={() => { setSubmitted(false); dispatch(clearLastTicket()); }}
        >
          Submit Another
        </button>
      </div>
    );
  }

  return (
    <form className="support-form" onSubmit={handleSubmit} noValidate>
      <div className="support-form__row">
        <div className="form-group">
          <label className="form-label">{t("support.name")}</label>
          <input
            name="name"
            type="text"
            className={`form-input ${errors.name ? "form-input--error" : ""}`}
            value={form.name}
            onChange={handleChange}
            placeholder="Mutyalu"
          />
          {errors.name && <span className="form-error">{errors.name}</span>}
        </div>

        <div className="form-group">
          <label className="form-label">{t("support.phone")}</label>
          <input
            name="phone"
            type="tel"
            className={`form-input ${errors.phone ? "form-input--error" : ""}`}
            value={form.phone}
            onChange={handleChange}
            placeholder="9876543210"
            maxLength={10}
          />
          {errors.phone && <span className="form-error">{errors.phone}</span>}
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">{t("support.area")}</label>
        <input
          name="area"
          type="text"
          className={`form-input ${errors.area ? "form-input--error" : ""}`}
          value={form.area}
          onChange={handleChange}
          placeholder="Kukatpally, Hyderabad"
        />
        {errors.area && <span className="form-error">{errors.area}</span>}
      </div>

      <div className="form-group">
        <label className="form-label">{t("support.issue")}</label>
        <select
          name="issue"
          className={`form-input form-select ${errors.issue ? "form-input--error" : ""}`}
          value={form.issue}
          onChange={handleChange}
        >
          <option value="">— Select —</option>
          {ISSUE_KEYS.map((key) => (
            <option key={key} value={key}>
              {t(`support.issues.${key}`)}
            </option>
          ))}
        </select>
        {errors.issue && <span className="form-error">{errors.issue}</span>}
      </div>

      <div className="form-group">
        <label className="form-label">{t("support.description")}</label>
        <textarea
          name="description"
          className="form-input form-textarea"
          value={form.description}
          onChange={handleChange}
          rows={4}
          placeholder="Please describe your issue in detail..."
        />
      </div>

      <button type="submit" className="btn btn--primary support-form__submit">
        {t("support.submit")}
        <span className="btn-arrow">→</span>
      </button>
    </form>
  );
}
