import { describe, it, expect, } from "vitest";
import { getDefaultHomePageForUserOfType } from "../utils/functions";
import { RUOLI } from "../entities/utente";
import { isAllFieldDefined } from "../utils/functions";

describe("utils", () => {
    describe("getHomeForUser", () => {

        it("should return /dashboard for admin", () => {
            const supervisore = false;

            expect(getDefaultHomePageForUserOfType({ ruolo: RUOLI.ADMIN, supervisore })).toBe("/dashboard");
        });

        it("should return /cucina for addetto cucina", () => {
            const supervisore = false;

            expect(getDefaultHomePageForUserOfType({ ruolo: RUOLI.ADDETTO_CUCINA, supervisore })).toBe("/cucina");
        });

        it("should return /ordinazione for cameriere", () => {
            const supervisore = false;

            expect(getDefaultHomePageForUserOfType({ ruolo: RUOLI.CAMERIERE, supervisore })).toBe("/ordinazione");
        });

        it("should return /supervisore for supervisore", () => {
            const supervisore = true;

            expect(getDefaultHomePageForUserOfType({ ruolo: RUOLI.CAMERIERE, supervisore })).toBe("/supervisore");
            expect(getDefaultHomePageForUserOfType({ ruolo: RUOLI.ADDETTO_CUCINA, supervisore })).toBe("/supervisore");
            expect(getDefaultHomePageForUserOfType({ ruolo: RUOLI.ADMIN, supervisore })).toBe("/supervisore");

        });

    })

    describe("isAllFieldDefined", () => {
        it("should return true if all fields are defined", () => {
            expect(isAllFieldDefined({ a: 1, b: 2, c: 3 })).toBe(true);
        });

        it("should return false if one field is undefined", () => {
            expect(isAllFieldDefined({ a: 1, b: 2, c: undefined })).toBe(false);
        });

        it("should return false if one field is null", () => {
            expect(isAllFieldDefined({ a: 1, b: 2, c: null })).toBe(false);
        });

        it("should return false if one field is empty string", () => {
            expect(isAllFieldDefined({ a: 1, b: 2, c: "" })).toBe(false);
        });

        it("should return false if one field is empty array", () => {
            expect(isAllFieldDefined({ a: 1, b: 2, c: [] })).toBe(false);
        });

        it("should return true if one field is empty string but is in except", () => {
            expect(isAllFieldDefined({ a: 1, b: 2, c: "" }, ["c"])).toBe(true);
        });

        it("should return true if one field is empty array but is in except", () => {
            expect(isAllFieldDefined({ a: 1, b: 2, c: [] }, ["c"])).toBe(true);
        });

        it("should return true if one field is null but is in except", () => {
            expect(isAllFieldDefined({ a: 1, b: 2, c: null }, ["c"])).toBe(true);
        });

        it("should return true if one field is undefined but is in except", () => {
            expect(isAllFieldDefined({ a: 1, b: 2, c: undefined }, ["c"])).toBe(true);
        });

        it("should return true if one field is undefined but is in except", () => {
            expect(isAllFieldDefined({ a: 1, b: 2, c: undefined }, ["c"])).toBe(true);
        });

        it("should return false if one field is undefined and is not in except", () => {
            expect(isAllFieldDefined({ a: 1, b: 2, c: undefined }, ["a"])).toBe(false);
        });

        it("should return false if one field is null and is not in except", () => {
            expect(isAllFieldDefined({ a: 1, b: 2, c: null }, ["a"])).toBe(false);
        });
        
    })
});

