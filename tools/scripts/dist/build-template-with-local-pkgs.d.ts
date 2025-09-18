/**
 * Recursively updates a JSON object to replace all instances of `workspace:` with the latest version pinned.
 *
 * Does not return and instead modifies the `packageJson` object in place.
 */
export declare function updatePackageJSONDependencies(args: {
    latestVersion: string;
    packageJson: Record<string, unknown>;
}): void;
//# sourceMappingURL=build-template-with-local-pkgs.d.ts.map