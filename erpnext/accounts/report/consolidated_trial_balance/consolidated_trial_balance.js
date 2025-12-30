// Copyright (c) 2025, Frappe Technologies Pvt. Ltd. and contributors
// For license information, please see license.txt

frappe.query_reports["Consolidated Trial Balance"] = {
	filters: [
		{
			fieldname: "company",
			label: __("Company"),
			fieldtype: "MultiSelectList",
			options: "Company",
			get_data: function (txt) {
				return frappe.db.get_link_options("Company", txt);
			},
			reqd: 1,
		},
		{
			fieldname: "filter_based_on",
			label: __("Filter Based On"),
			fieldtype: "Select",
			options: ["Fiscal Year", "Date Range"],
			default: "Fiscal Year",
			reqd: 1,
			on_change: function () {
				let filter_based_on = frappe.query_report.get_filter_value("filter_based_on");
				frappe.query_report.toggle_filter_display("from_fiscal_year", filter_based_on === "Date Range");
				frappe.query_report.toggle_filter_display("to_fiscal_year", filter_based_on === "Date Range");
				frappe.query_report.toggle_filter_display("period_start_date", filter_based_on === "Fiscal Year");
				frappe.query_report.toggle_filter_display("period_end_date", filter_based_on === "Fiscal Year");
				frappe.query_report.refresh();
			},
		},
		{
			fieldname: "period_start_date",
			label: __("Start Date"),
			fieldtype: "Date",
			depends_on: "eval:doc.filter_based_on == 'Date Range'",
			mandatory_depends_on: "eval:doc.filter_based_on == 'Date Range'",
		},
		{
			fieldname: "period_end_date",
			label: __("End Date"),
			fieldtype: "Date",
			depends_on: "eval:doc.filter_based_on == 'Date Range'",
			mandatory_depends_on: "eval:doc.filter_based_on == 'Date Range'",
		},
		{
			fieldname: "from_fiscal_year",
			label: __("Start Year"),
			fieldtype: "Link",
			options: "Fiscal Year",
			default: erpnext.utils.get_fiscal_year(frappe.datetime.get_today()),
			depends_on: "eval:doc.filter_based_on == 'Fiscal Year'",
			mandatory_depends_on: "eval:doc.filter_based_on == 'Fiscal Year'",
		},
		{
			fieldname: "to_fiscal_year",
			label: __("End Year"),
			fieldtype: "Link",
			options: "Fiscal Year",
			default: erpnext.utils.get_fiscal_year(frappe.datetime.get_today()),
			depends_on: "eval:doc.filter_based_on == 'Fiscal Year'",
			mandatory_depends_on: "eval:doc.filter_based_on == 'Fiscal Year'",
		},
		{
			fieldname: "periodicity",
			label: __("Periodicity"),
			fieldtype: "Select",
			options: [
				{ value: "Monthly", label: __("Monthly") },
				{ value: "Quarterly", label: __("Quarterly") },
				{ value: "Half-Yearly", label: __("Half-Yearly") },
				{ value: "Yearly", label: __("Yearly") },
			],
			default: "Yearly",
			reqd: 1,
		},
		{
			fieldname: "from_date",
			label: __("From Date"),
			fieldtype: "Date",
			default: erpnext.utils.get_fiscal_year(frappe.datetime.get_today(), true)[1],
			hidden: 1,
		},
		{
			fieldname: "to_date",
			label: __("To Date"),
			fieldtype: "Date",
			default: erpnext.utils.get_fiscal_year(frappe.datetime.get_today(), true)[2],
			hidden: 1,
		},
		{
			fieldname: "finance_book",
			label: __("Finance Book"),
			fieldtype: "Link",
			options: "Finance Book",
		},
		{
			fieldname: "presentation_currency",
			label: __("Currency"),
			fieldtype: "Select",
			options: erpnext.get_presentation_currency_list(),
		},
		{
			fieldname: "with_period_closing_entry_for_opening",
			label: __("With Period Closing Entry For Opening Balances"),
			fieldtype: "Check",
			default: 1,
		},
		{
			fieldname: "with_period_closing_entry_for_current_period",
			label: __("Period Closing Entry For Current Period"),
			fieldtype: "Check",
			default: 1,
		},
		{
			fieldname: "show_zero_values",
			label: __("Show zero values"),
			fieldtype: "Check",
		},
		{
			fieldname: "show_unclosed_fy_pl_balances",
			label: __("Show unclosed fiscal year's P&L balances"),
			fieldtype: "Check",
		},
		{
			fieldname: "include_default_book_entries",
			label: __("Include Default FB Entries"),
			fieldtype: "Check",
			default: 1,
		},
		{
			fieldname: "show_group_accounts",
			label: __("Show Group Accounts"),
			fieldtype: "Check",
			default: 1,
		},
	],
	formatter: erpnext.financial_statements.formatter,
	tree: true,
	name_field: "account",
	parent_field: "parent_account",
	initial_depth: 3,
};
