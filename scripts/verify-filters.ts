import assert from "node:assert/strict";
import { experiences } from "../src/data/experiences.ts";
import { filterExperiences } from "../src/lib/filterExperiences.ts";
import { CATEGORIES } from "../src/types/experience.ts";

assert.equal(experiences.length, 100);
assert.equal(new Set(experiences.map((item) => item.id)).size, 100);

for (const experience of experiences) {
  assert.ok(experience.id);
  assert.ok(experience.title);
  assert.ok(experience.description);
  assert.ok(CATEGORIES.includes(experience.category));
  assert.match(experience.destination, /,\s/);
  assert.equal(typeof experience.price, "number");
  assert.ok(experience.rating >= 0 && experience.rating <= 5);
  assert.ok(experience.imageUrl.startsWith("/images/"));
}

const sailing = filterExperiences(experiences, {
  search: "SAILING",
  category: "",
  destination: "",
});
assert.ok(sailing.length >= 3);
assert.ok(sailing.every((item) => /sailing/i.test(item.title)));

const stacked = filterExperiences(experiences, {
  search: "sailing",
  category: "adventure",
  destination: "Croatia",
});
assert.ok(stacked.length >= 1);
assert.ok(
  stacked.every(
    (item) =>
      item.category === "Adventure" &&
      item.destination.includes("Croatia") &&
      /sailing/i.test(item.title),
  ),
);

const categoryOnly = filterExperiences(experiences, {
  search: "",
  category: "Food",
  destination: "",
});
assert.ok(categoryOnly.every((item) => item.category === "Food"));
assert.ok(categoryOnly.length > 0);

const destinationOnly = filterExperiences(experiences, {
  search: "",
  category: "",
  destination: "croatia",
});
assert.ok(destinationOnly.every((item) => item.destination.includes("Croatia")));
assert.ok(destinationOnly.length > stacked.length);

const none = filterExperiences(experiences, {
  search: "sailing",
  category: "Food",
  destination: "",
});
assert.equal(none.length, 0);

const special = filterExperiences(experiences, {
  search: "sailing (",
  category: "",
  destination: "",
});
assert.ok(Array.isArray(special));

const all = filterExperiences(experiences, {
  search: "   ",
  category: "",
  destination: "",
});
assert.equal(all.length, 100);

console.log(
  JSON.stringify(
    {
      total: experiences.length,
      sailing: sailing.length,
      stacked: stacked.map((item) => item.title),
      food: categoryOnly.length,
      croatia: destinationOnly.length,
      noMatch: none.length,
    },
    null,
    2,
  ),
);
