"use client";

import { useEffect, useState } from "react";
import { MAX_PLACE_LENGTH } from "@/lib/waitlist-shared";

// Country <select> + City input with suggestions, shared by the waitlist form
// (on green) and the Matchmaker (Ghotok) Partner form (on white). Each form
// passes its own field style, so the look doesn't change. The country is
// stored by its English NAME, as before; the APIs still take any trimmed
// string up to 80 characters, so free-text cities keep working.

/** Shown first, in this order, above a divider. */
const PINNED = ["CA", "US", "GB", "BD", "AU", "AE", "SA", "QA", "KW", "MY", "IT", "DE"];

/** ISO 3166-1 alpha-2. */
const ISO_CODES = (
  "AD AE AF AG AI AL AM AO AQ AR AS AT AU AW AX AZ BA BB BD BE BF BG BH BI BJ BL BM BN BO BQ BR BS " +
  "BT BV BW BY BZ CA CC CD CF CG CH CI CK CL CM CN CO CR CU CV CW CX CY CZ DE DJ DK DM DO DZ EC EE EG " +
  "EH ER ES ET FI FJ FK FM FO FR GA GB GD GE GF GG GH GI GL GM GN GP GQ GR GS GT GU GW GY HK HM HN HR " +
  "HT HU ID IE IL IM IN IO IQ IR IS IT JE JM JO JP KE KG KH KI KM KN KP KR KW KY KZ LA LB LC LI LK LR " +
  "LS LT LU LV LY MA MC MD ME MF MG MH MK ML MM MN MO MP MQ MR MS MT MU MV MW MX MY MZ NA NC NE NF NG " +
  "NI NL NO NP NR NU NZ OM PA PE PF PG PH PK PL PM PN PR PS PT PW PY QA RE RO RS RU RW SA SB SC SD SE " +
  "SG SH SI SJ SK SL SM SN SO SR SS ST SV SX SY SZ TC TD TF TG TH TJ TK TL TM TN TO TR TT TV TW TZ UA " +
  "UG UM US UY UZ VA VC VE VG VI VN VU WF WS YE YT ZA ZM ZW"
).split(" ");

/** City suggestions for the pinned countries. Anything else can be typed. */
const CITY_SUGGESTIONS: Record<string, string[]> = {
  CA: ["Toronto", "Mississauga", "Brampton", "Scarborough", "Markham", "Ajax", "Pickering", "Oshawa", "Ottawa", "Montreal", "Calgary", "Edmonton", "Vancouver", "Winnipeg"],
  US: ["New York", "Queens", "Brooklyn", "Bronx", "Jersey City", "Paterson", "Detroit", "Hamtramck", "Atlanta", "Dallas", "Houston", "Los Angeles", "Chicago", "Boston", "Philadelphia"],
  GB: ["London", "Tower Hamlets", "Birmingham", "Manchester", "Oldham", "Bradford", "Luton"],
  BD: ["Dhaka", "Chattogram", "Sylhet", "Khulna", "Rajshahi", "Barishal", "Rangpur", "Mymensingh", "Cumilla"],
  AU: ["Canberra", "Sydney", "Melbourne", "Brisbane"],
  AE: ["Abu Dhabi", "Dubai", "Sharjah", "Al Ain"],
  SA: ["Riyadh", "Jeddah", "Mecca", "Medina"],
  QA: ["Doha", "Al Rayyan", "Al Wakrah", "Al Khor"],
  KW: ["Kuwait City", "Al Ahmadi", "Hawalli", "Al Farwaniyah"],
  MY: ["Kuala Lumpur", "Johor Bahru", "Ipoh", "George Town"],
  IT: ["Rome", "Milan", "Naples", "Turin"],
  DE: ["Berlin", "Hamburg", "Munich", "Cologne"],
};

type Country = { code: string; name: string };

/**
 * Built in the browser after mount: Intl.DisplayNames gives slightly
 * different names in different ICU versions (Node vs. browser), so building
 * it during server rendering would make the page fail to hydrate.
 */
function buildCountries(): { pinned: Country[]; rest: Country[] } | null {
  try {
    const names = new Intl.DisplayNames(["en"], { type: "region" });
    const toCountry = (code: string): Country | null => {
      const name = names.of(code);
      return name && name !== code ? { code, name } : null;
    };
    const pinned = PINNED.map(toCountry).filter((c): c is Country => c !== null);
    const rest = ISO_CODES.filter((code) => !PINNED.includes(code))
      .map(toCountry)
      .filter((c): c is Country => c !== null)
      .sort((a, b) => a.name.localeCompare(b.name, "en"));
    return { pinned, rest };
  } catch {
    return null; // very old browser: only the current value is offered
  }
}

export default function LocationFields({
  idPrefix,
  country,
  city,
  onCountryChange,
  onCityChange,
  fieldStyle,
  labelStyle,
  className,
  countryPlaceholder,
  invalid,
}: {
  idPrefix: string;
  country: string;
  city: string;
  onCountryChange: (value: string) => void;
  onCityChange: (value: string) => void;
  fieldStyle: React.CSSProperties;
  /** Visible labels in this style; without it the labels are screen-reader only. */
  labelStyle?: React.CSSProperties;
  className?: string;
  /** An empty first option, for forms with no default country. */
  countryPlaceholder?: string;
  invalid?: { country?: boolean; city?: boolean };
}) {
  const [countries, setCountries] = useState<ReturnType<typeof buildCountries>>(null);
  useEffect(() => setCountries(buildCountries()), []);

  const all = countries ? [...countries.pinned, ...countries.rest] : [];
  const listed = all.some((c) => c.name === country);
  const code = all.find((c) => c.name === country)?.code;
  const suggestions = (code && CITY_SUGGESTIONS[code]) || [];
  const labelClass = labelStyle ? undefined : "sr-only";
  // Options inherit the select's colour; on green that's white on a white menu.
  const option = { color: "var(--dark)" };

  return (
    <div className={className}>
      <div className="w-full">
        <label htmlFor={`${idPrefix}-country`} className={labelClass} style={labelStyle}>
          Country
        </label>
        <select
          id={`${idPrefix}-country`}
          name="country"
          required
          autoComplete="country-name"
          aria-invalid={invalid?.country || undefined}
          value={country}
          onChange={(e) => onCountryChange(e.target.value)}
          style={fieldStyle}
        >
          {countryPlaceholder && (
            <option value="" disabled style={option}>
              {countryPlaceholder}
            </option>
          )}
          {country && !listed && (
            <option value={country} style={option}>
              {country}
            </option>
          )}
          {countries?.pinned.map((c) => (
            <option key={c.code} value={c.name} style={option}>
              {c.name}
            </option>
          ))}
          {countries && (
            <option disabled style={option}>
              ──────────
            </option>
          )}
          {countries?.rest.map((c) => (
            <option key={c.code} value={c.name} style={option}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      <div className="w-full">
        <label htmlFor={`${idPrefix}-city`} className={labelClass} style={labelStyle}>
          City
        </label>
        <input
          id={`${idPrefix}-city`}
          type="text"
          name="city"
          required
          maxLength={MAX_PLACE_LENGTH}
          autoComplete="address-level2"
          placeholder={labelStyle ? undefined : "City"}
          list={suggestions.length ? `${idPrefix}-city-options` : undefined}
          aria-invalid={invalid?.city || undefined}
          value={city}
          onChange={(e) => onCityChange(e.target.value)}
          style={fieldStyle}
        />
        {suggestions.length > 0 && (
          <datalist id={`${idPrefix}-city-options`}>
            {suggestions.map((s) => (
              <option key={s} value={s} />
            ))}
          </datalist>
        )}
      </div>
    </div>
  );
}
